import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ClientsModule.register([
      {
        name: 'TODO_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 4001 },
      },
    ]),
  ],
})
export class AppModule {}
