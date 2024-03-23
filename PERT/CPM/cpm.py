import networkx as nx
from collections import namedtuple

# Define the Activity namedtuple
Activity = namedtuple('Activity', ['name', 'duration', 'predecessors'])

def get_activities():
    activities = []
    num_activities = int(input("Enter the number of activities: "))
    for i in range(num_activities):
        name = input(f"Enter name of activity {i+1}: ")
        duration = int(input(f"Enter duration of activity {i+1}: "))
        num_predecessors = int(input(f"Enter the number of predecessors for activity {i+1}: "))
        predecessors = []
        for j in range(num_predecessors):
            predecessor = input(f"Enter the name of predecessor {j+1} for activity {i+1}: ")
            predecessors.append(predecessor)
        activities.append(Activity(name=name, duration=duration, predecessors=predecessors))
    return activities

def find_critical_path(activities):
    G = nx.DiGraph()
    for activity in activities:
        G.add_node(activity.name, duration=activity.duration)
        for predecessor in activity.predecessors:
            G.add_edge(predecessor, activity.name)
    critical_path = nx.dag_longest_path(G)
    return critical_path

if __name__ == "__main__":
    activities = get_activities()
    critical_path = find_critical_path(activities)
    print("Critical Path:", critical_path)