from typing import Optional

class AutomationWorkflow:
    def __init__(self, id: str, name: str, description: str, status: str, last_run: str,
                 duration: str, processed_count: int, node_count: int, error: Optional[str] = None):
        self.id = id
        self.name = name
        self.description = description
        self.status = status
        self.last_run = last_run
        self.duration = duration
        self.processed_count = processed_count
        self.node_count = node_count
        self.error = error

    def to_dict(self):
        return self.__dict__
