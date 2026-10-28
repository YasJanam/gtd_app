import { Module } from '@nestjs/common';
import { InboxModule } from './inbox/inbox.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [InboxModule, ProjectsModule],
})

export class GtdModule {}