// @flow
import commonLayout from '../../explanation/base/layout';

export default function diagramLayout() {
  const layout: Object = commonLayout();
  layout.colors.get('diagram', 'text', 'heading')
    .toCssVar('--color-congruenttrianglessummary-sub-title');
  return layout;
}
