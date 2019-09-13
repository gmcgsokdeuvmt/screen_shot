# screen_shot
view screenshot in web browser (python, javascript)

python で スクリーンショット機能をつけた WebSocketサーバ を立ち上げ、Web ブラウザからスクリーンショット画像を取得します。
 
## Set up

conda 環境のセットアップ

```
$ conda create --name <env> --file env_name.txt
```

WebSocketサーバの立ち上げ

```
$ python web_socket_server.py
```

Webサーバの立ち上げ

```
$ python -m http.server <port>
```

ブラウザでの動作確認
 
 ```
 http://localhost:<port>/web_socket_client.html
 ```
 
 にアクセスしてポチポチ
