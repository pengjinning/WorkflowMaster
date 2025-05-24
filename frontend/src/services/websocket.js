class WebSocketService {
  constructor() {
    this.ws = null;
    this.url = '';
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectInterval = 5000;
    this.isConnecting = false;
    this.messageHandlers = [];
    this.connectHandlers = [];
    this.disconnectHandlers = [];
    this.errorHandlers = [];
  }

  connect(url) {
    if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
      return;
    }

    this.url = url;
    this.isConnecting = true;

    try {
      this.ws = new WebSocket(url);

      this.ws.onopen = (event) => {
        console.log('WebSocket connected');
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        this.connectHandlers.forEach(handler => {
          try {
            handler(event);
          } catch (error) {
            console.error('Error in connect handler:', error);
          }
        });
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.messageHandlers.forEach(handler => {
            try {
              handler(data);
            } catch (error) {
              console.error('Error in message handler:', error);
            }
          });
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket disconnected', event);
        this.isConnecting = false;
        this.disconnectHandlers.forEach(handler => {
          try {
            handler(event);
          } catch (error) {
            console.error('Error in disconnect handler:', error);
          }
        });

        // Attempt to reconnect if not manually closed
        if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.scheduleReconnect();
        }
      };

      this.ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        this.isConnecting = false;
        this.errorHandlers.forEach(handler => {
          try {
            handler(event);
          } catch (error) {
            console.error('Error in error handler:', error);
          }
        });
      };

    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      this.isConnecting = false;
      this.errorHandlers.forEach(handler => {
        try {
          handler(error);
        } catch (err) {
          console.error('Error in error handler:', err);
        }
      });
    }
  }

  scheduleReconnect() {
    this.reconnectAttempts++;
    console.log(`Scheduling WebSocket reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
    
    setTimeout(() => {
      if (this.reconnectAttempts <= this.maxReconnectAttempts) {
        console.log(`Attempting to reconnect WebSocket (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect(this.url);
      } else {
        console.log('Max reconnect attempts reached. Giving up.');
      }
    }, this.reconnectInterval);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close(1000); // Normal closure
      this.ws = null;
    }
    this.reconnectAttempts = this.maxReconnectAttempts; // Prevent reconnection
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify(data));
      } catch (error) {
        console.error('Error sending WebSocket message:', error);
      }
    } else {
      console.warn('WebSocket is not connected. Cannot send message:', data);
    }
  }

  onMessage(handler) {
    this.messageHandlers.push(handler);
  }

  onConnect(handler) {
    this.connectHandlers.push(handler);
  }

  onDisconnect(handler) {
    this.disconnectHandlers.push(handler);
  }

  onError(handler) {
    this.errorHandlers.push(handler);
  }

  removeMessageHandler(handler) {
    this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
  }

  removeConnectHandler(handler) {
    this.connectHandlers = this.connectHandlers.filter(h => h !== handler);
  }

  removeDisconnectHandler(handler) {
    this.disconnectHandlers = this.disconnectHandlers.filter(h => h !== handler);
  }

  removeErrorHandler(handler) {
    this.errorHandlers = this.errorHandlers.filter(h => h !== handler);
  }

  isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }

  getReadyState() {
    if (!this.ws) {
      return WebSocket.CLOSED;
    }
    return this.ws.readyState;
  }

  getReadyStateText() {
    const state = this.getReadyState();
    switch (state) {
      case WebSocket.CONNECTING:
        return 'CONNECTING';
      case WebSocket.OPEN:
        return 'OPEN';
      case WebSocket.CLOSING:
        return 'CLOSING';
      case WebSocket.CLOSED:
        return 'CLOSED';
      default:
        return 'UNKNOWN';
    }
  }
}

// Export singleton instance
export const websocketService = new WebSocketService();
