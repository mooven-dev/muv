# MUV

**M**ooven
**U**niversal
**V**iews

> 
|Description|  |
|-----------|--|
|           |  |

Mooven React component library.

|Install|  |
|-------|--|
|       |  |
Just run:

    npm add 'https://github.com/mooven-dev/muv'
    
|Usage|  |
|-----|--|
|     |  |
Just type:

    import * as Muv from 'muv';

then:

    <Muv.Button>my action</Muv.Button>

or:

    import { Button } from 'muv';
then:

    <Button>my action</Button>

|Styled-components|  |
|-----------------|--|
|                 |  |
Muv uses styled-components as style library, so, to avoid multiple instances of styled-component running together, we recommend to import styled-components instance from Muv, like this:

Wrong way:

    import styled from 'styled-components';
    import { Button } from 'muv';

Right way:

    import styled, { Button } from 'muv';
