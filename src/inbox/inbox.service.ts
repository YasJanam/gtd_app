import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInboxItemDto } from './dto/create-inboxitem.dto';
import { UpdateInboxItemDto } from './dto/update-inboxitem.dto';
import { InjectModel } from '@nestjs/mongoose';
import { InboxItem, InboxItemDocument } from './schema/item.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';
import { Types } from 'mongoose';
import { GtdStatus } from './enums/gtdStatuses.enum';
import { ProjectsService } from 'src/projects/projects.service';
import { Project } from 'src/projects/schema/project.schema';


type AINextActionType = {
  title: string,
  description: string, 
  order: number,
  estimatedMinutes: number
}



@Injectable()
export class InboxService {
  constructor(
    @InjectModel(InboxItem.name) private inboxItemModel: Model<InboxItemDocument>,
    private userService: UsersService,
    private projectService:ProjectsService,
  ) {}

  
  async createItem(createInboxDto: CreateInboxItemDto): Promise<InboxItem | null> {
    
    const user = await this.userService.findById(createInboxDto.user);
    if(!user) {
      throw new BadRequestException()
    }

    //console.log(user)

    const createdItem = new this.inboxItemModel({
      ...createInboxDto,user:(user as any)._id,status:GtdStatus.INBOX
    })
    const saved = await createdItem.save();
    //console.log(saved)
    return saved;
  }


  async convertInboxItemToProject(itemId: string): Promise<Project | null> {
    //console.log('///////////////')
    const item = await this.inboxItemModel.findById(itemId);
    if(!item) {
      throw new NotFoundException()
    }

    const project = await this.projectService.create({
      name:item.title,
      outcome: '',
      notes:item.description,
      user:item.user.toString()
    })

    await this.inboxItemModel.findByIdAndDelete(itemId);

    return project;
  }


  

  /*async findUserInboxItems(userId:string): Promise<InboxItem[]> {
    const items = await this.inboxItemModel.find({
      user: new Types.ObjectId(userId),
      status:GtdStatus.INBOX,
    });
    console.log(items.length)
    return items;
  }*/
  


  async findUserItems(
      userId: string,
      status?: string,
  ): Promise<InboxItem[]> {
      // ====== ۱. اعتبارسنجی ======
      if (!Types.ObjectId.isValid(userId)) {
          throw new BadRequestException('Invalid user ID');
      }

      // ====== ۲. ساخت کوئری ======
      const query: any = {
          user: new Types.ObjectId(userId),
      };

      if (status) {
          const validStatuses = Object.values(GtdStatus);
          
          if (!validStatuses.includes(status as GtdStatus)) {
              throw new BadRequestException(
                  `Invalid status. Allowed: ${validStatuses.join(', ')}`,
              );
          }
          
          query.status = status; 
      }

      console.log(query);
      const items = await this.inboxItemModel
          .find(query)
          .sort({ order: 1, createdAt: -1 })
          .exec();

      return items;
  }

 

  async findById(id: string): Promise<InboxItem | null> {
    const item = await this.inboxItemModel.findById(id);
    if(!item) {
      throw new NotFoundException()
    }
    return item;
  }


  async update(id: string, updateInboxDto: UpdateInboxItemDto): Promise<InboxItem | null> {
    const item = await this.inboxItemModel.findByIdAndUpdate(id,updateInboxDto);
    return item
  }


  async remove(id: string) : Promise<InboxItem | null> {
    const deleted = await this.inboxItemModel.findByIdAndDelete(id).sort({createdAt:-1});
    return deleted;
  }


  async changeItemStatus(id:string,status:string) : Promise<InboxItem | null> {
    const item = await this.inboxItemModel.findById(id);
    if(!item) {
      throw new NotFoundException();
    }

    const validStatuses = Object.values(GtdStatus);
    
    if (!validStatuses.includes(status as GtdStatus)) {
        throw new BadRequestException(
            `Invalid status. Allowed: ${validStatuses.join(', ')}`
        );
    }

    item.status = status as GtdStatus;
    await item.save();

    return item
  }


  async createProjectAction(projectId:string,title:string,description:string): Promise<InboxItem | null> {
    const proj = await this.projectService.findById(projectId);
    if(!proj) {
      throw new NotFoundException();
    }

    const action = new this.inboxItemModel({
      title: title,
      description : description,
      user : new Types.ObjectId(proj.user),
      project : (proj as any)._id
    })

    const saved = await action.save()
    return saved;

  }



  async createProjectActions(projectId:string,actions:AINextActionType[]) {
    
    console.log('create project actions')
    
    const proj = await this.projectService.findById(projectId);
    if(!proj) {
      throw new NotFoundException();
    }


    if (!actions || actions.length === 0) {
        return [];
    }

    //await this.inboxItemModel.deleteMany({project:new Types.ObjectId(projectId)})

    const actionsToInsert  = actions.map(ac => (
      {
        ...ac,
        user:proj.user,
        project:new Types.ObjectId(projectId),
        status:GtdStatus.NEXT_ACTION
      }
    ))

    const res = await this.inboxItemModel.insertMany(actionsToInsert)
  
    console.log(res);

    const newIds = res.map(a => a._id);
    await this.inboxItemModel.deleteMany({
        project: new Types.ObjectId(projectId),
        _id: { $nin: newIds },
    });


    return await this.inboxItemModel.find({
        project: new Types.ObjectId(projectId),
    }).sort({ order: 1 });
  }



  async addProjectAction(projectId:string,dto:CreateInboxItemDto) : Promise<InboxItem | null> {
    const user = await this.userService.findById(dto.user);
    if(!user) {
      throw new BadRequestException()
    }

    const proj = await this.projectService.findById(projectId);
    if(!proj) {
      throw new BadRequestException()
    }

    const createdItem = new this.inboxItemModel({
      ...dto,user:(user as any)._id,status:GtdStatus.NEXT_ACTION,project:(proj as any)._id,
    })
    const saved = await createdItem.save();
    //console.log(saved)
    return saved;
  }



  async getProjectActions(projectId:string): Promise<InboxItem[]> {
    console.log('get project actions');

    const acts =  await this.inboxItemModel.find({project: new Types.ObjectId(projectId),status:GtdStatus.NEXT_ACTION})
    .sort({ order: 1, createdAt: 1 });

    console.log(acts.length);

    return acts;
  }

  

}
