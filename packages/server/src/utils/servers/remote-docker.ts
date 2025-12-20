import { docker } from "@dokploy/server/constants";
import { findServerById } from "@dokploy/server/services/server";
import Dockerode from "dockerode";

export const getRemoteDocker = async (serverId?: string | null) => {
	if (!serverId) return docker;
	const server = await findServerById(serverId);
	if (!server.sshKeyId) return docker;
	const dockerode = new Dockerode({
		host: server.ipAddress,
		port: server.port,
		username: server.username,
		protocol: "ssh",
		version: "v1.44",
		// @ts-ignore
		sshOptions: {
			privateKey: server.sshKey?.privateKey,
		},
	});

	return dockerode;
};
