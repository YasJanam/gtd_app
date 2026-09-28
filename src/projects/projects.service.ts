import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './schema/project.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { InboxService } from 'src/inbox/inbox.service';
import { Types } from 'mongoose';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private userService: UsersService,
    //private inboxService: InboxService,

  ) {}



  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const user = await this.userService.findById(createProjectDto.user);
    if(!user) {
      throw new NotFoundException()
    }

    const project = new this.projectModel({
      ...createProjectDto,user:(user as any)._id
    })
    const saved = await project.save();
    return saved;
  }


  /*async convertInboxItemToProjects(itemId: string): Promise<Project> {
    const item = await this.inboxService.findById(itemId);
    if(!item) {
      throw new NotFoundException()
    }



    const project = new this.projectModel({
      name:item.title,
      notes:item.description,
      user:item.user
    })

    const saved = await project.save();
    return saved;
  }*/



  async findUserProjects(userId:string): Promise<Project[]> {
    const projs = await this.projectModel.find({user:new Types.ObjectId(userId)});
    return projs
  }



  async findById(id: string): Promise<Project | null> {
    const proj = await this.projectModel.findById(id);
    return proj;
  }



  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }


  async remove(id: string): Promise<Project | null> {
    const del = await this.projectModel.findByIdAndDelete(id);
    return del;
  }



  

}
