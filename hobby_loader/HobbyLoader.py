import requests
from bs4 import BeautifulSoup
from neo4j import GraphDatabase
from Neo4jConnection import Neo4jConnections
import os
from dotenv import load_dotenv

load_dotenv()

if __name__ == "__main__":
    uri = os.getenv('DB_URI')
    user = os.getenv('DB_USER')
    password = os.getenv('DB_PASSWORD')

    conn = Neo4jConnections(uri, user, password)

    URL = "https://en.wikipedia.org/wiki/List_of_hobbies"
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, "html.parser")

    groups = soup.find_all(class_="div-col")
    x = 2
    for group in groups:
        hobbies = group.find_all('a', title = True)
        for hobby in hobbies:
            while x > 1:
                print("adding " + hobby.getText())
                conn.add_hobby(hobby.getText())
                x -= 1

    conn.close()

