import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render/*, tap, click, settled, pauseTest, wait*/ } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ember slider', function(hooks) {
  setupRenderingTest(hooks);

  // Basic rendering test
  test('it renders', async function(assert) {

    await render(hbs`{{ember-slider}}`);
    assert.equal(parseInt(this.$('.slider-value')[0].textContent), 0, 'Value set to 0');
  });

  test('range configuration', async function(assert) {

    this.set('options', {range: {min: 10, max: 20}});

    await render(hbs`{{ember-slider config=options}}`);
    assert.equal(parseInt(this.$('.slider-value')[0].textContent), 10, 'Value set to 10');
  });

  test('initialValue test with min=0,max=100 (default)', async function(assert) {
    //Pick a random number between 0 and 100 and try to set it. (note that default min=0 and max=100)
    let rand = Math.floor(Math.random() * 100);
    this.set('initialValue', rand);
    await render(hbs`{{ember-slider initialValue=initialValue}}`);
    assert.equal(parseInt(this.$('.slider-value')[0].textContent), rand, `Value set to ${rand}`);
  });

  test('initialValue test with min=10,max=20', async function(assert) {

    this.set('options', {range: {min: 10, max: 20}});

    await render(hbs`{{ember-slider config=options initialValue=13}}`);
    assert.equal(parseInt(this.$('.slider-value')[0].textContent), 13, 'Value set to 13');
  });

  test('initialValue out of bound test with < min', async function(assert) {

    this.set('options', {range: {min: 10, max: 20}});

    await render(hbs`{{ember-slider config=options initialValue=9}}`);
    assert.equal(parseInt(this.$('.slider-value')[0].textContent), 10, 'Tried setting initialValue=9, with min=10. Value set to 10');
  });

  test('initialValue out of bound test with > max', async function(assert) {

    this.set('options', {range: {min: 10, max: 20}});

    await render(hbs`{{ember-slider config=options initialValue=21}}`);
    assert.equal(parseInt(this.$('.slider-value')[0].textContent), 20, 'Tried setting initialValue=21, with max=20. Value set to 20');
  });

  // test('tap to change value', async function(assert) {
  //   assert.expect(2);
  //   await render(hbs`{{ember-slider initialValue=10}}`);
  //   assert.equal(parseInt(this.$('.slider-value')[0].textContent), 10, 'Value set to 10');

  //   this.$('.ember-slider').on('click', function(e) {
  //     console.log("Entered ", e);
  //   });
  //   await tap('.ember-slider');
  //   await settled();
  //   assert.equal(parseInt(this.$('.slider-value')[0].textContent), 0, 'Value set back to 0 by tapping');
  // });
});

module('Integration | Component | ember slider | Likert scale', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let options = {
      likert: {
        enabled: true
      }
    };
    this.set('options', options);
    await render(hbs`{{ember-slider config=options}}`);

    assert.notEqual(this.$('.likert-point').length, 0, 'Likert scale can be enabled');
  });

  test('it renders with default as 3-point', async function(assert) {
    let options = {
      likert: {
        enabled: true
      }
    };
    this.set('options', options);
    await render(hbs`{{ember-slider config=options}}`);

    assert.equal(this.$('.likert-point').length, 3, '3-point likert scale rendered as default');
  });

  test('it renders 5-point likert scale', async function(assert) {
    let options = {
      likert: {
        enabled: true,
        points: 5
      }
    };
    this.set('options', options);
    await render(hbs`{{ember-slider config=options}}`);

    assert.equal(this.$('.likert-point').length, 5, '5-point likert scale rendered');
  });

  test('it renders 7-point likert scale', async function(assert) {
    let options = {
      likert: {
        enabled: true,
        points: 7
      }
    };
    this.set('options', options);
    await render(hbs`{{ember-slider config=options}}`);

    assert.equal(this.$('.likert-point').length, 7, '7-point likert scale rendered');
  });
  
  test('7-point likert scale, initialValue test', async function(assert) {
    let options = {
      likert: {
        enabled: true,
        points: 7
      }
    };
    this.set('options', options);
    await render(hbs`{{ember-slider config=options initialValue=4}}`);

    assert.equal(parseInt(this.$('.slider-value')[0].textContent), 4, '7-point likert scale rendered with initialValue as 4');
  });

  test('7-point likert scale, initialValue out of bound test', async function(assert) {
    let options = {
      likert: {
        enabled: true,
        points: 7
      }
    };
    this.set('options', options);
    await render(hbs`{{ember-slider config=options initialValue=9}}`);

    assert.equal(parseInt(this.$('.slider-value')[0].textContent), 6, 'Tried setting initialValue=9, with 7-point likert. Value set to 6');
  });
});
