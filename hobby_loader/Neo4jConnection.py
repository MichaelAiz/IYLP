from neo4j import GraphDatabase


class Neo4jConnections:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()
    
    def _add_and_return_hobby(self, tx, hobby_name):
            query = (
                "CREATE (h:Hobby { name: $hobby_name }) "
                "RETURN h"
            )
            result = tx.run(query, hobby_name = hobby_name)
            for row in result:
                print(row['h'])
            return result

        
    def add_hobby(self, hobby_name):
        with self.driver.session() as session:
            result = session.write_transaction(
                self._add_and_return_hobby, hobby_name
            )
    
if __name__ == "__main__":
    print('hello')
    conn = Neo4jConnections("yeah", "2", "3")

