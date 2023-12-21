import { testTransform } from '../../../test'
import { voidToUndefined } from '../transforms'

const expectJS = testTransform(voidToUndefined)

it('void 0', () => expectJS('void 0').toMatchInlineSnapshot('undefined;'))

it('ignore when undefined is declared in scope', () =>
  expectJS('let undefined = 1; { void 0; }').toMatchInlineSnapshot(`
    let undefined = 1;
    {
      void 0;
    }
  `))
