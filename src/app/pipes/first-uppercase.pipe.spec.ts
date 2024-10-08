import { FirstUppercasePipe } from './first-uppercase.pipe';

describe('FirstUppercasePipe', () => {
  it('create an instance', () => {
    const pipe = new FirstUppercasePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform text',()=>{
    const pipe = new FirstUppercasePipe();
    const data = pipe.transform('HOLA MUNDO');
    expect(data).toBe('Hola mundo')
  })
});
