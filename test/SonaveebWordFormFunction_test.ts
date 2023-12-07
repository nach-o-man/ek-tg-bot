import { assertEquals } from 'https://deno.land/std@0.207.0/assert/assert_equals.ts';
import { SonaveebWordFormFunction } from '../src/service/function/SonaveebWordFormFunction.ts';

Deno.test('SonaveebWordFormFunction test ', async () => {
    const actual = new SonaveebWordFormFunction().extractWordForms(`<html>
    <div>
        <button class="word-form">word-form-1</button>
    <div>
    <div><div>
        <button class="word-form">word-form-2</button>
        <button class="other-class word-form">word-form-1</button>
    </div></div>
    </html`);

    assertEquals(actual, {
        wordForms: new Set(['word-form-1', 'word-form-2']),
    });
});
