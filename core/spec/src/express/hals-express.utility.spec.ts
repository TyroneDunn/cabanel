import {describe} from "node:test";
import {mapToPath} from "../../../src/express/hals-express.utility";
import {Method} from "../../../src/app/method.type";
import {RequestHandler} from "../../../src/app/method.type";

const mockRequestHandler: RequestHandler = jasmine.createSpy('GetXRequestHandler');

describe('Map To Path Suite', () => {

    describe('When given a method with no path or param key', () => {
        it('should produce an empty path', () => {
            const mockMethod: Method = {
                type: "GET",
                paramKeys: [],
                queryParamKeys: [],
                sideEffects: [],
                middleware: [],
                requestHandler: mockRequestHandler
            };
            const path: string = mapToPath(mockMethod);
            expect(path).toBe('/');
        });
    });

    describe('When given a method with a single param key', () => {
        it('should produce a path with a single param', () => {
            const mockMethodWithSingleParam: Method = {
                type: "GET",
                paramKeys: ['id'],
                queryParamKeys: [],
                sideEffects: [],
                middleware: [],
                requestHandler: mockRequestHandler
            };
            const pathWithSingleParam: string = mapToPath(mockMethodWithSingleParam);
            expect(pathWithSingleParam).toBe('/:id');
        });
    });


    describe('When given a method with a path and a single param', () => {
        it('should produce a path with path and single param', () => {
            const mockMethodWithPathAndSingleParam: Method = {
                type: "GET",
                path: 'x',
                paramKeys: ['id'],
                queryParamKeys: [],
                sideEffects: [],
                middleware: [],
                requestHandler: mockRequestHandler
            };
            const pathWithPathAndSingleParam: string = mapToPath(mockMethodWithPathAndSingleParam);
            expect(pathWithPathAndSingleParam).toBe('/x/:id');
        });
    });

    describe('When given a method with a path and two params', () => {
        it('should produce a path with a path and two params', () => {
            const mockMethodWithPathAndTwoParams: Method = {
                type: "GET",
                path: 'x',
                paramKeys: ['id', 'a'],
                queryParamKeys: [],
                sideEffects: [],
                middleware: [],
                requestHandler: mockRequestHandler
            };
            const pathWithPathAndTwoParams: string = mapToPath(mockMethodWithPathAndTwoParams);
            expect(pathWithPathAndTwoParams).toBe('/x/:id/:a');
        });
    });
});
