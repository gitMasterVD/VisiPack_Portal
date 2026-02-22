import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Message {
  type: 'bot' | 'user';
  text: string;
}

interface PODetails {
  client: string;
  item: string;
  status: string;
}

@Component({
  standalone: true,
  selector: 'app-chatbot',
 imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {

  userMessage = '';
  step: 'greeting' | 'po' | 'status' = 'greeting';
  currentPO: string | null = null;

  messages: Message[] = [
    {
      type: 'bot',
      text: 'Hello! I am your Dispatch Assistant. Please greet to begin.'
    }
  ];

  PO_DATABASE: Record<string, PODetails> = {
    PO123: { client: "ABC Pvt Ltd", item: "ITM-4589", status: "Pending Dispatch" },
    PO456: { client: "Skyline Traders", item: "ITM-7741", status: "In Transit" },
    PO789: { client: "Global Exports", item: "ITM-9912", status: "Delivered" }
  };

  handleUserInput() {
    const text = this.userMessage.trim();
    if (!text) return;

    this.messages.push({ type: 'user', text });
    this.userMessage = '';

    this.processMessage(text);
  }

  processMessage(text: string) {

    if (this.step === 'greeting') {
      this.messages.push({
        type: 'bot',
        text: 'Nice to meet you 😊<br>Please enter your PO Number.'
      });
      this.step = 'po';
      return;
    }

    if (this.step === 'po') {
      const po = text.toUpperCase();

      if (this.PO_DATABASE[po]) {
        this.currentPO = po;
        const data = this.PO_DATABASE[po];

        this.messages.push({
          type: 'bot',
          text: `
            <b>PO Details Found ✅</b><br><br>
            <b>Client:</b> ${data.client}<br>
            <b>Item:</b> ${data.item}<br><br>
            Type <b>status</b> to check shipment.
          `
        });

        this.step = 'status';
      } else {
        this.messages.push({
          type: 'bot',
          text: '❌ Invalid PO Number.'
        });
      }
      return;
    }

    if (this.step === 'status' && this.currentPO) {
      const status = this.PO_DATABASE[this.currentPO].status;

      this.messages.push({
        type: 'bot',
        text: `
          <b>Shipment Status</b><br><br>
          PO: ${this.currentPO}<br>
          Current Stage: <b>${status}</b>
        `
      });

      this.step = 'po';
    }
  }
}