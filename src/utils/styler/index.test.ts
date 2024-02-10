import { cssVar } from './cssVar';
import { pixel } from './pixel';

describe('styler', ()=>{
  describe('cssVar', ()=>{
    it('should return original object with keys prepending --', ()=>{
      const testVars = { cursor: 'good' };
      const res = cssVar(testVars);
      expect(res).toStrictEqual({ '--cursor': 'good' });
    });

    it('should return original object with keys prepending -- not camelcase', ()=>{
      const testVars = { 'scroll-snap': 'none', 'scroll-behaviour': 'none' };
      const res = cssVar(testVars);
      expect(res).toStrictEqual({ '--scroll-snap': 'none', '--scroll-behaviour': 'none' });
    });

    it('should return empty object if empty object is used', ()=>{
      const res = cssVar({});
      expect(res).toStrictEqual({});
    });
  });

  describe('pixel', ()=>{
    it('should return value with px prepended on number', ()=>{
      const val = 22;
      const res = pixel(val);
      expect(res).toBe('22px');
    });

    it('should value with px prepended on string val', ()=>{
      const val = '22';
      const res = pixel(val);
      expect(res).toBe('22px');
    });

    it('should value with px prepended on negativ number', ()=>{
      const val = -22;
      const res = pixel(val);
      expect(res).toBe('-22px');
    });

    it('should value with px prepended on string value', ()=>{
      const val = 'a';
      const res = pixel(val);
      expect(res).toBe('apx');
    });
  });
});
