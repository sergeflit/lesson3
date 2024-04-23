import java.io.FileWriter;
import java.io.IOException;
import java.util.PriorityQueue;

public class Toy {
    private int[] ids;
    private String[] names;
    private int[] frequencies;

    public Toy(String idString, String nameString, String frequencyString) {
        // Разбиение строк на массивы
        String[] idTokens = idString.split(",");
        String[] nameTokens = nameString.split(",");
        String[] frequencyTokens = frequencyString.split(",");

        // Проверка на соответствие количества элементов в каждой строке
        if (idTokens.length != nameTokens.length || idTokens.length != frequencyTokens.length) {
            System.err.println("Ошибка: количество элементов в строках не совпадает");
            return;
        }

        // Преобразование строковых массивов в массивы целых чисел
        ids = new int[idTokens.length];
        names = new String[nameTokens.length];
        frequencies = new int[frequencyTokens.length];

        for (int i = 0; i < idTokens.length; i++) {
            ids[i] = Integer.parseInt(idTokens[i]);
            names[i] = nameTokens[i];
            frequencies[i] = Integer.parseInt(frequencyTokens[i]);
        }
    }

    public void processAndGet() {
        // Создание приоритетной очереди
        PriorityQueue<ToyElement> queue = new PriorityQueue<>((t1, t2) -> t2.getFrequency() - t1.getFrequency());

        // Заполнение приоритетной очереди
        for (int i = 0; i < ids.length; i++) {
            ToyElement toy = new ToyElement(ids[i], names[i], frequencies[i]);
            queue.add(toy);
        }

        // Запись результатов в файл
        try (FileWriter writer = new FileWriter("output.txt")) {
            for (int i = 0; i < 10; i++) {
                ToyElement toy = queue.poll();
                if (toy != null) {
                    writer.write("Toy ID: " + toy.getId() + ", Name: " + toy.getName() + "\n");
                } else {
                    writer.write("No more toys available in the queue.\n");
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        // Пример входных данных
        String idString = "1,2,3";
        String nameString = "Toy1,Toy2,Toy3";
        String frequencyString = "3,2,5";

        // Создание объекта Toy
        Toy toy = new Toy(idString, nameString, frequencyString);
        // Вызов метода для обработки и записи результатов
        toy.processAndGet();
    }
}

class ToyElement {
    private int id;
    private String name;
    private int frequency;

    public ToyElement(int id, String name, int frequency) {
        this.id = id;
        this.name = name;
        this.frequency = frequency;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getFrequency() {
        return frequency;
    }
}

