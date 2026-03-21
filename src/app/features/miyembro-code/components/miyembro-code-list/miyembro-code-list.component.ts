import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { MiyembroCodeConfigServerComponent } from '../miyembro-code-config-server/miyembro-code-config-server.component';
import { MiyembroCodeDiscoveryComponent } from '../miyembro-code-discovery/miyembro-code-discovery.component';
import { MiyembroCodeEventComponent } from '../miyembro-code-event/miyembro-code-event.component';
import { MiyembroCodeEmailComponent } from '../miyembro-code-email/miyembro-code-email.component';
import { MiyembroCodeGatewayComponent } from '../miyembro-code-gateway/miyembro-code-gateway.component';
import { MiyembroCodeUiComponent } from '../miyembro-code-ui/miyembro-code-ui.component';
import { MiyembroCodeMemberComponent } from '../miyembro-code-member/miyembro-code-member.component';
import { MiyembroCodeOrganizationComponent } from '../miyembro-code-organization/miyembro-code-organization.component';

@Component({
  selector: 'app-miyembro-code-list',
  imports: [
    AccordionModule,
    MiyembroCodeConfigServerComponent,
    MiyembroCodeDiscoveryComponent,
    MiyembroCodeEventComponent,
    MiyembroCodeEmailComponent,
    MiyembroCodeGatewayComponent,
    MiyembroCodeUiComponent,
    MiyembroCodeMemberComponent,
    MiyembroCodeOrganizationComponent,
  ],
  templateUrl: './miyembro-code-list.component.html',
  styleUrl: './miyembro-code-list.component.css',
})
export class MiyembroCodeListComponent {}
