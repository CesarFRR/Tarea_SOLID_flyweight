from abc import ABC, abstractmethod

# La interfaz estrategia declara operaciones comunes a todas
# las versiones soportadas de algún algoritmo. El contexto
# utiliza esta interfaz para invocar el algoritmo definido por
# las estrategias concretas.
class Strategy(ABC):
    """Interfaz para definir una estrategia.
    
    POO: Abstracción
    """

    @abstractmethod
    def execute(self, a, b):
        """Método que debe ser implementado por todas las estrategias."""
        pass

# Las estrategias concretas implementan el algoritmo mientras
# siguen la interfaz estrategia base. La interfaz las hace
# intercambiables en el contexto.
class ConcreteStrategyAdd(Strategy):
    """Estrategia concreta que realiza una adición.

    POO: Herencia
    """

    def execute(self, a, b):
        return a + b

class ConcreteStrategySubtract(Strategy):
    """Estrategia concreta que realiza una sustracción.

    POO: Herencia
    """

    def execute(self, a, b):
        return a - b

class ConcreteStrategyMultiply(Strategy):
    """Estrategia concreta que realiza una multiplicación.

    POO: Herencia
    """

    def execute(self, a, b):
        return a * b

# El contexto define la interfaz de interés para los clientes.
class Context:
    """Clase que maneja las estrategias y ejecuta operaciones.

    POO: Composición
    """

    def __init__(self):
        self.strategy = None

    def set_strategy(self, strategy):
        """Establece la estrategia a utilizar."""
        self.strategy = strategy

    def execute_strategy(self, a, b):
        """Ejecuta la estrategia seleccionada."""
        return self.strategy.execute(a, b)

# El código cliente elige una estrategia concreta y la pasa al
# contexto. El cliente debe conocer las diferencias entre
# estrategias para elegir la mejor opción.
class ExampleApplication:
    """Ejemplo de aplicación que utiliza el patrón Strategy.

    POO: Encapsulamiento
    """

    def main(self):
        context = Context()
        while(True):

            first_number = int(input("Ingrese el primer número: "))
            second_number = int(input("Ingrese el segundo número: "))
            action = input("Elija la operación (addition, subtraction, multiplication): ")

            if action == "addition" or action == "+":
                context.set_strategy(ConcreteStrategyAdd())
            elif action == "subtraction" or action == "-":
                context.set_strategy(ConcreteStrategySubtract())
            elif action == "multiplication" or action == "*":
                context.set_strategy(ConcreteStrategyMultiply())
            else:
                print('Error en los datos ingresados')

            result = context.execute_strategy(first_number, second_number)

            print(f"Resultado: {result}")
            action = input('Si desea salir ingrese "exit", de lo contrario presione Enter: ')
            if action=='salir' or action=='exit' or action=='cancel':
                break

# Ejemplo de uso
if __name__ == "__main__":
    app = ExampleApplication()
    app.main()
