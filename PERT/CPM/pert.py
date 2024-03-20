class Activity:
    def __init__(self, name, optimistic, pessimistic, most_likely):
        self.name = name
        self.optimistic = optimistic
        self.pessimistic = pessimistic
        self.most_likely = most_likely
        self.expected_time = (optimistic + (4 * most_likely) + pessimistic) / 6
        self.variance = ((pessimistic - optimistic) / 6) ** 2

def get_activities_pert():
    activities = []
    num_activities = int(input("Enter the number of activities: "))
    for i in range(1, num_activities + 1):
        name = input(f"Enter name of activity {i}: ")
        optimistic = int(input(f"Enter optimistic time for activity {i}: "))
        pessimistic = int(input(f"Enter pessimistic time for activity {i}: "))
        most_likely = int(input(f"Enter most likely time for activity {i}: "))
        activities.append(Activity(name, optimistic, pessimistic, most_likely))
    return activities

def pert():
    activities = get_activities_pert()
    expected_duration = 0
    variance_sum = 0
    for activity in activities:
        expected_duration += activity.expected_time
        variance_sum += activity.variance
    project_duration = expected_duration
    project_variance = variance_sum ** 0.5
    return project_duration, project_variance

# Example usage
if __name__ == "__main__":
    project_duration, project_variance = pert()
    print("Expected Project Duration:", project_duration)
    print("Project Variance:", project_variance)
