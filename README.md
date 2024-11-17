## Rasa Setup Instructions

1. Install Rasa:
```bash
pip install rasa
```

2. Initialize Rasa project:
```bash
cd rasa
rasa init
```

3. Train the model:
```bash
rasa train
```

4. Run Rasa server:
```bash
rasa run --enable-api --cors '*'
```

5. In a separate terminal, run Rasa actions server:
```bash
rasa run actions
```

The Rasa server will be available at http://l