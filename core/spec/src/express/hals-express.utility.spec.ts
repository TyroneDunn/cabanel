import {describe} from "node:test";
import {mapToPath} from "../../../src/express/hals-express.utility";
import {Method} from "../../../src/app/method.type";
import {RequestHandler} from "../../../src/app/method.type";

const mockRequestHandler: RequestHandler = jasmine.createSpy('GetXRequestHandler');

describe('Map To Path Suite', () => {
    it('should pass', () => {
        const mockMethod: Method = {
            type: "GET",
            paramKeys: ['id'],
            queryParamKeys: [],
            sideEffects: [],
            middleware: [],
            requestHandler: mockRequestHandler
        };
        const path: string = mapToPath(mockMethod);
        expect(path).toBe('/:id');
    });

    it('should pass', () => {
        const mockMethod: Method = {
            type: "GET",
            path: 'x',
            paramKeys: ['id'],
            queryParamKeys: [],
            sideEffects: [],
            middleware: [],
            requestHandler: mockRequestHandler
        };
        const path: string = mapToPath(mockMethod);
        expect(path).toBe('/x/:id');
    });


    it('should pass', () => {
        const mockMethod: Method = {
            type: "GET",
            path: 'x',
            paramKeys: ['id', 'a'],
            queryParamKeys: [],
            sideEffects: [],
            middleware: [],
            requestHandler: mockRequestHandler
        };
        const path: string = mapToPath(mockMethod);
        expect(path).toBe('/x/:id/:a');
    });
});
