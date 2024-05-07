from firebase_admin import firestore

def list_trade(user_id, trade_details):
    db = firestore.client()
    trades_ref = db.collection('Trades')
    trades_ref.add({**trade_details, "user_id": user_id})

def fetch_trades():
    db = firestore.client()
    trades_ref = db.collection('Trades')
    results = trades_ref.stream()
    return [{**doc.to_dict(), "id": doc.id} for doc in results]
