import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './entities/contact.entity';
import { ProvidersModule } from 'src/providers/providers.module';
import { AdaptersModule } from 'src/adapters/adapters.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Contact.name,
        schema: ContactSchema,
      },
    ]),
    ProvidersModule,
    AdaptersModule,
  ],
  controllers: [ContactController],
  providers: [ContactController, ContactService],
  exports: [ContactController, ContactService, ProvidersModule, AdaptersModule],
})
export class ContactModule {}
