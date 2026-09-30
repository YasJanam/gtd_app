import { Controller,Req, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { CreateInboxItemDto } from './dto/create-inboxitem.dto';
import { UpdateInboxItemDto } from './dto/update-inboxitem.dto';
import { AuthGuard } from '@nestjs/passport';

type AINextActionType = {
  title: string,
  description: string, 
  order: number,
  estimatedMinutes: number
}


@Controller('inbox')
export class InboxController {
  constructor(private readonly inboxService: InboxService) {}

  @Post('items')
  @UseGuards(AuthGuard('jwt'))
  createItem(@Body() createInboxDto: CreateInboxItemDto) {
    console.log("llddd")

    return this.inboxService.createItem(createInboxDto);
  }


  
  /*@Get('user-items')
  @UseGuards(AuthGuard('jwt'))
  async findUserInboxItems(@Req() request:Request) {
    const uid = (request as any).user?.uid;
    return this.inboxService.findUserInboxItems(uid);
  }*/



  // find user items by status in query
  @Get('user-items')
  @UseGuards(AuthGuard('jwt'))
  async findUserItems(@Req() request:Request,@Query('status') status?:string) {
    const uid = (request as any).user?.uid;
    return this.inboxService.findUserItems(uid,status);
  }


  @Get('project/items')
  @UseGuards(AuthGuard('jwt'))
  async findProjectActions(@Query('project') project:string) {
    console.log('project actions controller');

    if (!project) {
        throw new BadRequestException('project query parameter is required');
    }
    
    return this.inboxService.getProjectActions(project)
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('items/:id')
  async findById(@Param('id') id: string) {
    return this.inboxService.findById(id);
  }


  @UseGuards(AuthGuard('jwt'))
  @Patch('items/:id')
  async update(@Param('id') id: string, @Body() updateInboxDto: UpdateInboxItemDto) {
    return this.inboxService.update(id, updateInboxDto);
  }


  @UseGuards(AuthGuard('jwt'))
  @Delete('items/:id')
  remove(@Param('id') id: string) {
    return this.inboxService.remove(id);
  }


  @UseGuards(AuthGuard('jwt'))
  @Patch('items/:id/change-status')
  async changeStatus(@Param('id') id: string,@Body() body:{status:string}) {
    return this.inboxService.changeItemStatus(id,body.status);
  }


  @UseGuards(AuthGuard('jwt'))
  @Post('items/:id/convert-to-project')
  async convertInboxItemToProject(@Param('id') id: string) {
    return this.inboxService.convertInboxItemToProject(id);
  }
  

  @UseGuards(AuthGuard('jwt'))
  @Post('project/:id/create-actions')
  async createProjectActions(@Param('id') id: string,@Body() body:{actions:AINextActionType[]}) {
    return this.inboxService.createProjectActions(id,body.actions);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('project/:id/add-action')
  async addProjectAction(@Param('id') id: string,@Body() body:CreateInboxItemDto) {
    return this.inboxService.addProjectAction(id,body);
  }
}
