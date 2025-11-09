import grpc
from backend.grpc import glossary_pb2
from backend.grpc import glossary_pb2_grpc

def run():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = glossary_pb2_grpc.GlossaryServiceStub(channel)

        # Получить все термины
        response = stub.GetAllTerms(glossary_pb2.Empty())
        print("Все термины:")
        for term in response.terms:
            print(f"{term.id}: {term.term}")

        # Получить термин по ID
        single = stub.GetTermById(glossary_pb2.TermRequest(id=1))
        print(f"\nТермин 1: {single.term} — {single.definition}")

if __name__ == "__main__":
    run()
