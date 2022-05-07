import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest{
  type: string,
  comment: string,
  screenshot?: string
}

export class SubmitFeedbackUseCase{

  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ){}

  async execute( request: SubmitFeedbackUseCaseRequest){
    const { type, comment, screenshot } = request;

    if(!type){
      throw new Error('Type is required');
    }

    if(!['BUG','IDEA','OTHER'].includes(type)){
      throw new Error('Invalid type of feedback');
    }

    if(!comment){
      throw new Error("Comment is required");
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error ('Invalid screenshot format.')
    }

    await this.feedbacksRepository.create({ type, comment, screenshot});
    await this.mailAdapter.sendMail({ 
      subject: 'Novo feedback',
      body: [
        "<html>",
          "<body>",
            "<h1>Feedback</h1>",
            '<div style="font-family:arial;font-size:14px;color:#121">',
              `<p>Tipo de feedback: ${type}</p>`,
              `<p>Comentário: ${comment}</p>`,
              screenshot ? `<image src="${screenshot}"/>` : '',
            "</div>",
          "</body>",
        "</html>"
      ].join('')
    });
  }
}