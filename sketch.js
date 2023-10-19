// Elementos del proyecto
/** La clase ShapeManager es una clase de JavaScript que administra una lista de formas y almacena
 *atributos comunes. */
class ShapeManager {
  static shapesList = []
  static commonAttributes
  /**
   * La función crea un número específico de formas de acuerdo al tipo de forma
   */
  static createShapes() {
    Shape.init(ShapeManager.commonAttributes)
    ShapeManager.shapesList = []
    for (let i = 0; i < ShapeManager.commonAttributes.numBubbles; i++) {
      ShapeManager.shapesList.push(
        eval('new ' + ShapeManager.commonAttributes.type + '()')
      )
    }
  }
}

/** La clase Shape es una clase de forma básica en JavaScript que se inicializa con los atributos comunes para todos,
 *además de ser la implementación de el patrón de diseño FlyWieght actuando como clase liviana conteniendo atributos estaticos
 *al mismo tiempo que actúa como clase padre para las diferentes figuras */
class Shape {
  static size
  static color
  static strokeWeight
  static originX
  static originY
  static init(attributes) {
    this.size = attributes.size
    this.color = attributes.fillColor
    this.strokeWeight = attributes.strokeWeight
    this.originX = attributes.originX
    this.originY = attributes.originY
  }

  update() { }
  display() { }
}

/**  La clase Bubble representa una forma que se mueve por la pantalla y rebota en los bordes. */
class Bubble extends Shape {
  x
  y
  constructor() {
    super()
    this.x = Shape.originX
    this.y = Shape.originY
    this.dx = random(-2, 2)
    this.dy = random(-2, 2)
  }

  update() {
    this.x += this.dx
    this.y += this.dy

    if (this.x < 0 || this.x > width) {
      this.dx *= -1
    }

    if (this.y < 0 || this.y > height) {
      this.dy *= -1
    }
  }

  display() {
    stroke(255)
    strokeWeight(Shape.strokeWeight)
    fill(Shape.color)
    ellipse(this.x, this.y, Shape.size * 2)
  }
}

/** La clase Cuadrado extiende la clase Forma y representa una forma cuadrada que se puede actualizar y
 *mostrar en un lienzo, ademnás de moverse por la pantalla y rebotar en los bordes.  */
class Square extends Shape {
  x
  y
  constructor() {
    super()
    this.x = Shape.originX
    this.y = Shape.originY
    this.dx = random(-2, 2)
    this.dy = random(-2, 2)
  }

  update() {
    this.x += this.dx
    this.y += this.dy

    if (this.x < 0 || this.x > width) {
      this.dx *= -1
    }

    if (this.y < 0 || this.y > height) {
      this.dy *= -1
    }
  }

  display() {
    stroke(255)
    strokeWeight(Shape.strokeWeight)
    fill(Shape.color)
    square(this.x, this.y, Shape.size * 2)
  }
}
class HtmlManager {
  constructor() {
    this.setupUI();
  }

  /**
   * La función `setupUI` configura detectores de eventos para detectar cambios en los controles de entrada
   * y llama a la función `updateConfiguration` cuando se detecta un cambio.
   */
  setupUI() {
    const numShapesInput = document.getElementById('numShapesInput');
    const sizeSlider = document.getElementById('sizeSlider');
    const colorInput = document.getElementById('colorInput');
    const strokeWeightSlider = document.getElementById('strokeWeightSlider');
    const typeInput = document.getElementById('shapeType');

    numShapesInput.addEventListener('input', this.updateConfiguration.bind(this));
    sizeSlider.addEventListener('input', this.updateConfiguration.bind(this));
    colorInput.addEventListener('input', this.updateConfiguration.bind(this));
    strokeWeightSlider.addEventListener('input', this.updateConfiguration.bind(this));
    typeInput.addEventListener('input', this.updateConfiguration.bind(this));
  }

  /**
   * La función "updateConfiguration" actualiza la configuración recuperando atributos comunes y creando las
   * formas.
   */
  updateConfiguration() {
    ShapeManager.commonAttributes = this.getCommonAttributes();
    ShapeManager.createShapes();
  }

  /**
   * La función `getCommonAttributes` recupera los atributos comunes del HTML para crear formas, como tamaño,
   * color, grosor del trazo, número de formas, coordenadas de origen y tipo de forma.
   * @returns un objeto con las propiedades de los Shapes
   */
  getCommonAttributes() {
    const sizeSlider = document.getElementById('sizeSlider');
    const colorInput = document.getElementById('colorInput');
    const strokeWeightSlider = document.getElementById('strokeWeightSlider');
    const numShapesInput = document.getElementById('numShapesInput');
    const ShapeType = document.getElementById('shapeType');

    document.getElementById('sizeValue').textContent = sizeSlider.value;
    document.getElementById('colorValue').textContent = colorInput.value;
    document.getElementById('strokeWeightValue').textContent = strokeWeightSlider.value;

    return {
      size: parseInt(sizeSlider.value),
      fillColor: colorInput.value,
      strokeWeight: parseInt(strokeWeightSlider.value),
      numBubbles: parseInt(numShapesInput.value), // Agrega el número de burbujas
      originX: width / 2,
      originY: height / 2,
      type: ShapeType.value
    };
  }
}

// P5.js functions
function setup() {
  const canvas = createCanvas(800, 600)
  canvas.parent('canvasContainer')
  noFill()
  const DOM = new HtmlManager(); // Configuración de la interfaz de usuario
  ShapeManager.commonAttributes = DOM.getCommonAttributes()
  Shape.init(ShapeManager.commonAttributes)
  ShapeManager.createShapes()
}

function draw() {
  background(0)
  for (const shape of ShapeManager.shapesList) {
    shape.update()
    shape.display()
  }
}
