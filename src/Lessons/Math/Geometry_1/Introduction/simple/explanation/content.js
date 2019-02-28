// @flow
// import Fig from 'figureone';
import * as React from 'react';
import SimpleLessonContent from '../../../../../../js/Lesson/SimpleLessonContent';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';

class Content extends SimpleLessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setContent(htmlId: string) {
    this.sections = [
      <div key={0} id={htmlId}>
      <p>
        {
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.'
        }
      </p>
      <p>
        {
          'Proin fringilla non ligula vel laoreet. Quisque volutpat tristique tellus nec tempus. Cras sit amet nibh elit. Quisque ac orci posuere, sollicitudin lacus ut, vestibulum elit. Sed ultrices laoreet tortor et aliquet. Mauris varius mattis massa et molestie. Sed auctor, est vel molestie ultrices, mauris sapien semper quam, ac vehicula ligula felis nec velit. Vivamus tristique ullamcorper pellentesque. Nam vitae nulla at arcu imperdiet accumsan ac dapibus velit. Pellentesque non turpis id erat volutpat molestie. Aliquam pellentesque erat et fringilla molestie. Quisque lorem elit, aliquam ut auctor sit amet, tincidunt eu lorem. Etiam vitae fringilla massa. Integer ultrices elementum ligula, mollis semper quam lobortis vel. Nullam vitae nunc vel metus auctor congue vel quis felis. Praesent eget massa vel turpis pretium dapibus sit amet at orci.'
        }
      </p>
      <p>
        {
          'In vitae dictum arcu, quis consectetur lectus. Integer hendrerit nibh accumsan, varius sapien et, vehicula libero. Pellentesque sit amet dictum turpis. Vivamus ornare nunc dui, nec convallis mi gravida quis. Quisque euismod vel nisl at ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam accumsan arcu velit, feugiat cursus est imperdiet eu. Donec sit amet est eget ipsum varius fringilla id vitae lorem. Vivamus vehicula ornare dui, ut elementum nulla egestas vitae.'
        }
      </p>
      <p>
        {
          'Mauris ac felis elit. Sed vitae diam eget erat mollis convallis vel in sem. Cras non condimentum nisi. Quisque fermentum nunc nec eros sagittis placerat. Sed condimentum rutrum volutpat. Donec venenatis rhoncus est quis ullamcorper. Etiam vitae lorem rutrum, consequat quam ut, vehicula massa. Praesent eget aliquet dui. Quisque imperdiet neque sit amet felis commodo, in placerat quam euismod. Proin eu sapien vel libero semper tristique vitae eget turpis.'
        }
      </p>
      <p>
        {
          'Morbi cursus tellus sapien, eget scelerisque neque dapibus vitae. Nunc semper venenatis justo et pellentesque. Nullam aliquet nunc vel eleifend gravida. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi ultricies id risus sit amet viverra. Donec id magna eu dui laoreet tempor. Sed commodo sit amet erat et maximus. Curabitur vitae ornare ligula, ut elementum massa. Pellentesque ullamcorper tempus aliquam. Nulla posuere aliquet sapien, sit amet suscipit nulla feugiat id. Mauris interdum lectus a ex suscipit, et sodales nulla hendrerit.'
        }
      </p>
    </div>,
    ];
  }
}

export default Content;
