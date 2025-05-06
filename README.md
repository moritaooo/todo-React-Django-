# Django × React (Vite) 簡易Todoアプリ

このプロジェクトは、Django REST FrameworkとReact (Vite) を用いたシンプルなTodoアプリです。

## 構成技術

- Django + Django REST Framework
- React (Vite)
- Fetch API による連携
- 環境変数でAPI URLを管理

## 環境構築方法（開発用）

### 1. Django側

cd backend/
python -m venv venv
source venv/bin/activate  # Windowsは venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver

### 2.React側
cd frontend/
npm install
npm run dev

### 環境変数
.env ファイルを frontend/ に作成してください。
VITE_API_URL=http://localhost:8000/api/
