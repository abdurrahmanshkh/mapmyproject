from flask import Flask,request,jsonify
from flask_cors import CORS
from pert import get_pert_data 
app=Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
@app.route("/api/pert",methods=['POST'])
def handle_pert():
    data=request.json
    var,mean,total_mean,total_var=get_pert_data(data['optimisticTimes'],data['pessimisticTimes'],data['mostLikelyTimes'])
    res={
        'var':var,
        'mean':mean,
        'total_mean':total_mean,
        'total_var':total_var
    }
    return jsonify(res)

if __name__=="__main__":
    app.run()