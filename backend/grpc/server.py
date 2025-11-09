import grpc
from concurrent import futures
from backend.grpc import glossary_pb2
from backend.grpc import glossary_pb2_grpc
from sqlmodel import Session, select
from backend.db import engine
from backend.models import Term

class GlossaryServiceServicer(glossary_pb2_grpc.GlossaryServiceServicer):
    def GetAllTerms(self, request, context):
        with Session(engine) as session:
            terms = session.exec(select(Term)).all()
            term_list = [
                glossary_pb2.Term(
                    id=t.id,
                    term=t.term,
                    definition=t.definition,
                    source=t.source or "",
                    related=t.related or ""
                ) for t in terms
            ]
        return glossary_pb2.TermList(terms=term_list)

    def GetTermById(self, request, context):
        with Session(engine) as session:
            term = session.get(Term, request.id)
            if not term:
                context.set_details(f"Term with id={request.id} not found")
                context.set_code(grpc.StatusCode.NOT_FOUND)
                return glossary_pb2.Term()
            return glossary_pb2.Term(
                id=term.id,
                term=term.term,
                definition=term.definition,
                source=term.source or "",
                related=term.related or ""
            )

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    glossary_pb2_grpc.add_GlossaryServiceServicer_to_server(GlossaryServiceServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("gRPC сервер запущен на порту 50051")
    server.wait_for_termination()

if __name__ == "__main__":
    serve()
