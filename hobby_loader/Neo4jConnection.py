from neo4j import GraphDatabase


class Neo4jConnections:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()
    
    def _add_hobby(self, tx, hobby_name, hobby_id):
            query = (
                "CREATE (h:Hobby { name: $hobby_name, id: $hobby_id }) "
                "RETURN h"
            )
            tx.run(query, hobby_name = hobby_name, hobby_id = hobby_id)  
    def add_hobby(self, hobby_name, hobby_id):
        with self.driver.session() as session:
            result = session.write_transaction(
                self._add_hobby, hobby_name, hobby_id
            )

    def _delete_all_hobbies(self, tx):
        query = (
            "MATCH (n)"
            "DETACH DELETE n"
        )
        tx.run(query)
    def delete_all_hobbies(self):
        with self.driver.session() as session:
            session.write_transaction(
                self._delete_all_hobbies
            )

    def _add_constraints(self, tx):
        query = (
            "CREATE CONSTRAINT unique_hobby_name FOR (hobby:Hobby) REQUIRE hobby.name IS UNIQUE" 
            "CREATE CONSTRAINT unique_hobby_ID FOR (hobby:Hobby) REQUIRE hobby.id IS UNIQUE" 
        )
    def create_constraints(self):
        with self.driver.session() as session:
            session.write_transaction(
                self._add_constraints
            )

