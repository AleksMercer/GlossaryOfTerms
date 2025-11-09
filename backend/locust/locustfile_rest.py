from locust import HttpUser, task, between

class RestUser(HttpUser):
    wait_time = between(0.5, 1.0)

    @task(5)
    def get_all_terms(self):
        self.client.get("/terms", name="/terms")

    @task(1)
    def get_term(self):
        self.client.get("/terms/1", name="/terms/1")
