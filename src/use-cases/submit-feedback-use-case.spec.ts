import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy},
  { sendMail: sendMailSpy}
);
describe('Submit feedback',  ()=>{
  it('should be able to submit an feedback of type BUG', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: ''
    })).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled( );
    expect(sendMailSpy).toHaveBeenCalled( );
  });
  it('should be able to submit an feedback of type IDEA', async ()=>{
    await expect(submitFeedback.execute({
      type: 'IDEA',
      comment: 'example comment',
      screenshot: ''
    })).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled( );
    expect(sendMailSpy).toHaveBeenCalled( );
  });
  it('should be able to submit an feedback of type OTHER', async ()=>{
    await expect(submitFeedback.execute({
      type: 'OTHER',
      comment: 'example comment',
      screenshot: ''
    })).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled( );
    expect(sendMailSpy).toHaveBeenCalled( );
  });
  it('should not be able to submit an empty type', async ()=>{
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,aevrarewvr'
    })).rejects.toThrow();
    expect(createFeedbackSpy).not.toHaveBeenCalled( );
    expect(sendMailSpy).not.toHaveBeenCalled( );
  });
  it('should not be able to submit an invalid type', async ()=>{
    await expect(submitFeedback.execute({
      type: 'FESFG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,aevrarewvr'
    })).rejects.toThrow();
    expect(createFeedbackSpy).not.toHaveBeenCalled( );
    expect(sendMailSpy).not.toHaveBeenCalled( );
  });
  it('should be able to submit an feedback with valid screenshot', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,aevrarewvr'
    })).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled( );
    expect(sendMailSpy).toHaveBeenCalled( );
  });
  it('should be able to submit an feedback with empty screenshot', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: ''
    })).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled( );
    expect(sendMailSpy).toHaveBeenCalled( );
  });
  it('should not be able to submit an invalid screenshot', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data.jpg'
    })).rejects.toThrow();
    expect(createFeedbackSpy).not.toHaveBeenCalled( );
    expect(sendMailSpy).not.toHaveBeenCalled( );
  });
  

  it('should not be able to submit an empty comment', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,aevrarewvr'
    })).rejects.toThrow();
    expect(createFeedbackSpy).not.toHaveBeenCalled( );
    expect(sendMailSpy).not.toHaveBeenCalled( );
  });
  
  
})