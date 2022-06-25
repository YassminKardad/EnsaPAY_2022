import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/models/agent';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.css']
})
export class AgentsListComponent implements OnInit {
  agents?: Agent[];
  currentAgent: Agent = {};
  currentIndex = -1;
  firstname = '';
  constructor(private agentService: AgentService) { }
  ngOnInit(): void {
    this.retrieveAgents();
  }
  retrieveAgents(): void {
    this.agentService.getAll()
      .subscribe({
        next: (data) => {
          this.agents = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrieveAgents();
    this.currentAgent = {};
    this.currentIndex = -1;
  }
  setActiveAgent(agent: Agent, index: number): void {
    this.currentAgent = agent;
    this.currentIndex = index;
  }
  removeAllAgents(): void {
    this.agentService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
  searchFirstname(): void {
    this.currentAgent = {};
    this.currentIndex = -1;
    this.agentService.findByFirstname(this.firstname)
      .subscribe({
        next: (data) => {
          this.agents = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
