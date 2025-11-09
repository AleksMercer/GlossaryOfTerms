from locust import User, task, between
import grpc
from backend.grpc import glossary_pb2, glossary_pb2_grpc

class GrpcUser(User):
    wait_time = between(0.5, 1.0)

    def on_start(self):
        self.channel = grpc.insecure_channel("localhost:50051")
        self.stub = glossary_pb2_grpc.GlossaryServiceStub(self.channel)

    def on_stop(self):
        self.channel.close()

    @task(5)
    def get_all_terms(self):
        self.stub.GetAllTerms(glossary_pb2.Empty())

    @task(1)
    def get_term(self):
        self.stub.GetTermById(glossary_pb2.TermRequest(id=1))
