from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import pymongo
import random

app = Flask(__name__)

client = pymongo.MongoClient("mongodb+srv://admin:admin@quizfatec-xl7tb.mongodb.net/test?retryWrites=true&w=majority")
dbProvas = client["QuizFATEC"]


@app.route('/QuizFATEC/Provas',methods=['GET'])
def get_all_questions():       
    colProvas = dbProvas["provas"]  
    output = []
    for q in colProvas.find():
        output.append({'texto': q['texto'], 'a': q['a'], 'b': q['b'], 'c': q['c'], 'd': q['d'], 'e': q['e'], 'reposta': q['resposta'], 'tema': q['tema']})

    return jsonify({'resp' : output})
#==================================================================================================================================================================================
@app.route('/QuizFATEC/Provas/<id>', methods=['GET'])
def get_one_question(id):
    colProvas = dbProvas["provas"]  
    q = colProvas.find_one({'_id': id})
    if q is None :
        output = ''
    else:
        output = {'texto': q['texto'], 'a': q['a'], 'b': q['b'], 'c': q['c'], 'd': q['d'], 'e': q['e'], 'reposta': q['resposta'], 'tema': q['tema']}
    
    return jsonify({'resp' : output})
#==================================================================================================================================================================================
@app.route('/QuizFATEC/Provas/Temas/<tema>', methods=['GET'])
def get_random_by_theme(tema):
    colProvas = dbProvas["provas"]  
    lst = []
    for q in colProvas.find({'tema': tema}):
        lst.append({'texto': q['texto'], 'a': q['a'], 'b': q['b'], 'c': q['c'], 'd': q['d'], 'e': q['e'], 'reposta': q['resposta'], 'prova': q['prova'], 'numero':q['numero'], 'tema': q['tema']})

    i = random.randint(1, len(lst))
    output = lst[i]

    return jsonify({'resp' : output})
#==================================================================================================================================================================================
@app.route('/QuizFATEC/Provas/Random/', methods=['GET'])
def get_random():
    colProvas = dbProvas["provas"]  
    
    lst = []
    for q in colProvas.find():
        lst.append({'texto': q['texto'], 'a': q['a'], 'b': q['b'], 'c': q['c'], 'd': q['d'], 'e': q['e'], 'reposta': q['resposta'], 'prova': q['prova'], 'numero':q['numero'], 'tema': q['tema']})

    i = random.randint(1, len(lst))
    output = lst[i]
    return jsonify({'resp' : output})
#==================================================================================================================================================================================
@app.route('/QuizFATEC/Usuarios/', methods=['POST'])
def add_authorized():
    colUsuarios = dbProvas["usuarios"]  
    
    id = request.json['_id']

    colUsuarios.update_one({"_id" : id}, {"$set": request.json}, upsert=True)
    
    q = colUsuarios.find_one({'_id': id})
    if q is None :
        output = ''
    else:
        output = {'_id': q['_id'], 'email': q['email']}

    return jsonify({'resp' : output})
#==================================================================================================================================================================================
@app.route('/QuizFATEC/Usuarios/Login', methods=['POST'])
def get_authorized():
    colUsuarios = dbProvas["usuarios"] 
 
    id = request.json['_id']
    password = request.json['password']

    q = colUsuarios.find_one({'_id': id})
    if q is None :
        output = "Usuario nao cadastrado"
    elif q['password'] != password:
        output = "Senha invalida, verifique a ortografia"
    else:
        output = {'_id': q['_id'], 'email': q['email']}

    return jsonify({'resp' : output})

if __name__ == '__main__':
    app.run(debug = True)