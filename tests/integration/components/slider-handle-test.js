import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | slider handle', function(hooks) {
  setupRenderingTest(hooks);

  test('handle renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{slider-handle}}`);

    assert.equal(this.element.textContent.trim(), '');
  });

  test('handle value set to 10', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{slider-handle value=10}}`);

    assert.equal(this.$('.slider-value')[0].textContent.trim(), '10');
  });
});
