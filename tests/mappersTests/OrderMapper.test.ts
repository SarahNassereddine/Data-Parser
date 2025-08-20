import { CSVOrderMapper } from '../../src/mappers/Order.mapper';
import { IMapper } from '../../src/mappers/IMapper';
import { IOrder } from '../../src/model/IOrder';
import { IItem } from '../../src/model/IItem';
import { OrderBuilder } from '../../src/model/builders/Order.builder';

describe('CSVOrderMapper', () => {
    // Mock IMapper for IItem
    const mockItem: IItem = {
        id: '0',
        type: 'Sponge',
        flavor: 'Vanilla',
        filling: 'Cream',
        size: '20',
        layers: '2',
        frostingType: 'Buttercream',
        frostingFlavor: 'Vanilla',
        decorationType: 'Sprinkles',
        decorationColor: 'Multi-color',
        customMessage: 'Happy Birthday',
        shape: 'Round',
        allergies: 'Nut-Free',
        specialIngredients: 'Organic Ingredients',
        packagingType: 'Standard Box'
    };

    const mockItemMapper: IMapper<string[], IItem> = {
        map: jest.fn().mockReturnValue(mockItem),
        reverseMap: jest.fn().mockReturnValue([
            '0', 'Sponge', 'Vanilla', 'Cream', '20', '2', 'Buttercream', 'Vanilla',
            'Sprinkles', 'Multi-color', 'Happy Birthday', 'Round', 'Nut-Free',
            'Organic Ingredients', 'Standard Box'
        ])
    };

    const csvOrderMapper = new CSVOrderMapper(mockItemMapper);

    const csvData = [
        '0', 'Sponge', 'Vanilla', 'Cream', '20', '2', 'Buttercream', 'Vanilla',
        'Sprinkles', 'Multi-color', 'Happy Birthday', 'Round', 'Nut-Free',
        'Organic Ingredients', 'Standard Box', '1', '50'
    ];

    it('should map CSV data to IOrder', () => {
        const order = csvOrderMapper.map(csvData);
        expect(order.getId()).toBe('0');
        expect(order.getQuantity()).toBe(1);
        expect(order.getPrice()).toBe(50);
        expect(order.getItem()).toEqual(mockItem);
        expect(mockItemMapper.map).toHaveBeenCalledWith(csvData);
    });

    it('should reverse map IOrder to CSV data', () => {
        const order = OrderBuilder.newBuilder()
            .setId('0')
            .setQuantity(1)
            .setPrice(50)
            .setItem(mockItem)
            .build();

        const result = csvOrderMapper.reverseMap(order);
        expect(result).toEqual([
            '0', 'Sponge', 'Vanilla', 'Cream', '20', '2', 'Buttercream', 'Vanilla',
            'Sprinkles', 'Multi-color', 'Happy Birthday', 'Round', 'Nut-Free',
            'Organic Ingredients', 'Standard Box', '1', '50'
        ]);
        expect(mockItemMapper.reverseMap).toHaveBeenCalledWith(mockItem);
    });

    it('should handle invalid quantity and price gracefully', () => {
        const badData = [...csvData];
        badData[15] = 'not_a_number';
        badData[16] = 'NaN';
        const order = csvOrderMapper.map(badData);
        expect(order.getQuantity()).toBeNaN();
        expect(order.getPrice()).toBeNaN();
    });

    it('should throw if itemMapper.map throws', () => {
        const errorMapper: IMapper<string[], IItem> = {
            map: jest.fn(() => { throw new Error('Invalid item'); }),
            reverseMap: jest.fn()
        };
        const mapper = new CSVOrderMapper(errorMapper);
        expect(() => mapper.map(csvData)).toThrow('Invalid item');
    });

    it('should throw if input data is missing required fields', () => {
        const shortData = csvData.slice(0, 10); // Not enough fields
        expect(() => csvOrderMapper.map(shortData)).toThrow();
    });
});