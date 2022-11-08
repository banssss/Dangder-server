import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockUser } from '../blockUsers/entities/blockUser.entity';
import { Breed } from '../breeds/entities/breed.entity';
import { Character } from '../characters/entities/character.entity';
import { ChatMessage } from '../chatMessages/entities/chatMessage.entity';
import { ChatRoom } from '../chatRooms/entities/chatRoom.entity';
import { DogsImagesService } from '../dogsImages/dogsImages.service';
import { DogImage } from '../dogsImages/entities/dogImage.entity';
import { Interest } from '../interests/entities/interest.entity';
import { Like } from '../likes/entities/like.entity';
import { LikesService } from '../likes/likes.service';
import { Location } from '../locations/entities/location.entity';
import { User } from '../users/entities/user.entity';
import { DogsResolver } from './dogs.resolver';
import { DogsService } from './dogs.service';
import { Dog } from './entities/dog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Dog, //
      Interest, //
      BlockUser, //
      Character, //
      DogImage, //
      Location, //
      Breed, //
      Like, //
      User,
      ChatRoom,
      ChatMessage,
    ]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  providers: [
    DogsResolver, //
    DogsService, //
    LikesService,
    DogsImagesService,
  ],
})
export class DogsModule {}
