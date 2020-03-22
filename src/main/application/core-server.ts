import * as http from "http";
import * as net from "net";

import routes from "main/application/routes";
import ConfigRepository from "main/infrastructure/repositories/ConfigRepository";

class CoreServer {
	private readonly app = routes;

	private readonly sockets = new Set<net.Socket>();

	private server?: http.Server = undefined;

	public async start(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.server = this.app
				.listen(ConfigRepository.load("general").port, () => resolve())
				.on("error", (err) => {
					reject(err);
				})
				.on("connection", (socket) => {
					socket.on("close", () => {
						this.sockets.delete(socket);
					});
					this.sockets.add(socket);
				})
				.on("close", () => {
					this.sockets.forEach((socket) => {
						socket.destroy();
					});

					this.sockets.clear();
				});
		});
	}

	public async close(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.server) {
				this.server.close((err) => reject(err));
				this.server = undefined;
				resolve();
			}
		});
	}

	public async restart(): Promise<void> {
		await this.close();
		return this.start();
	}

	public address(): string | net.AddressInfo | null {
		return this.server ? this.server.address() : null;
	}
}

export default CoreServer;
