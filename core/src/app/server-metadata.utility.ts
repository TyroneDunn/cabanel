import { NodeEnvironmentOption } from '@hals/common/lib/app/application-schema.type';

export const serverStartedMessage = (
   title : string,
   host : string,
   port : number,
   version : string,
   environment : NodeEnvironmentOption,
) : string => {
   const messageTitle : string = `'${title}' Hals Server Started\n `;
   const messageDivider : string = '----------------------------------------\n';
   const messageActions : string = `App running at http://${host}:${port}\n` +
                                   `Press Ctrl+C to stop the server.\n`;
   return messageTitle + messageDivider + serverMetadata(title, port, version, environment) + '\n' +
      messageActions + messageDivider;
};

export const serverMetadata = (
   title : string,
   port : number,
   version : string,
   environment : NodeEnvironmentOption,
) : string =>
   `Server: ${title}\nPort: ${port}\nEnvironment: ${environment}\nVersion: ${version}\n`;
