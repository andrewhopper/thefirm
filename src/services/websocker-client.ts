class RedisWebSocket {
    private ws: WebSocket;
    private url: string;
    constructor(url = 'ws://localhost:8080') {
        this.url = url;
        this.connect();
    }

    connect() {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Redis event:', data);
            // Handle the event here
        };

        this.ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
            // Reconnect after 5 seconds
            setTimeout(() => this.connect(), 5000);
        };
    }

    // @todo good
    sendMessage(message: any) {
        try {
            this.ws.send(JSON.stringify(message));
            return true;
        } catch (error) {
            console.error('WebSocket error:', error);
            return false;
        }
    }
}

export default RedisWebSocket;