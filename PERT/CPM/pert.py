import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm

def calculate_pert(minimum, maximum, most_likely):
    optimistic = minimum
    pessimistic = maximum
    most_likely = most_likely
    
    expected_value = (optimistic + 4 * most_likely + pessimistic) / 6
    variance = ((pessimistic - optimistic) / 6) ** 2
    
    return expected_value, variance


def get_pert_data(optimistic,pessimistic,likely):
    
    minimum_estimates = optimistic
    maximum_estimates = pessimistic
    most_likely_estimates = likely
    
    variance_arr=[]
    mean_arr=[]
    for i in range(len(minimum_estimates)):
        mean, variance = calculate_pert(minimum_estimates[i], maximum_estimates[i], most_likely_estimates[i])
        mean_arr.append(mean)
        variance_arr.append(variance)
    total_expected_time=sum(mean_arr)
    total_variance_time=sum(variance_arr)

    print("Var: ",variance_arr,mean_arr)
    return variance_arr,mean_arr,total_expected_time,total_variance_time
