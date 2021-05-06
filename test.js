import BpmnModdle from 'bpmn-moddle';
import fs from 'fs';

const moddle = new BpmnModdle();

async function startProcess() {

    let definitions2 = moddle.create("bpmn:Definitions");

    let startEvent = moddle.create("bpmn:StartEvent", {
        id: "start"
    });

    let process = moddle.create("bpmn:Process", {
        id: "process",
        isExecutable: false,
        flowElements: [
            startEvent
        ]
    });

    let shape = moddle.create("bpmndi:BPMNShape", {
        id: "shape",
        bpmnElement: startEvent,
        bounds: moddle.create("dc:Bounds", {
            x: 152,
            y: 82,
            width: 36,
            height: 36
        })
    })

    let plane = moddle.create("bpmndi:BPMNPlane", {
        id: "plane",
        planeElement: [
            shape
        ]
    });

    let diagram = moddle.create("bpmndi:BPMNDiagram", {
        id: "diagram",
        plane: plane
    });

    definitions2.get('rootElements').push(process);

    definitions2.get('diagrams').push(diagram);

    const {
        xml: xmlStr2
    } = await moddle.toXML(definitions2);

    console.log(xmlStr2);

} // startProcess

async function twoActivityWithConnector() {

    let definitions2 = moddle.create("bpmn:Definitions");

    let sequenceFlow = moddle.create("bpmn:SequenceFlow", {
        id: "flow"
    })

    let task = moddle.create("bpmn:Task", {
        id: "task",
        outgoing: [
            sequenceFlow
        ]
    });

    let task1 = moddle.create("bpmn:Task", {
        id: "task1",
        incoming: [
            sequenceFlow
        ]
    });

    sequenceFlow.sourceRef = task;

    sequenceFlow.targetRef = task1;

    let edge = moddle.create("bpmndi:BPMNEdge", {
        id: "edge",
        bpmnElement: sequenceFlow
    });

    let shape = moddle.create("bpmndi:BPMNShape", {
        id: "shape",
        bpmnElement: task,
        bounds: moddle.create("dc:Bounds", {
            x: 160,
            y: 50,
            width: 100,
            height: 88
        })
    });

    let shape1 = moddle.create("bpmndi:BPMNShape", {
        id: "shape1",
        bpmnElement: task1,
        bounds: moddle.create("dc:Bounds", {
            x: 450,
            y: 50,
            width: 100,
            height: 88
        })
    });

    let process = moddle.create("bpmn:Process", {
        id: "process",
        isExecutable: false,
        flowElements: [
            sequenceFlow,
            task,
            task1
        ]
    });

    let plane = moddle.create("bpmndi:BPMNPlane", {
        id: "plane",
        planeElement: [
            edge,
            shape,
            shape1
        ]
    });

    let diagram = moddle.create("bpmndi:BPMNDiagram", {
        id: "diagram",
        plane: plane
    });

    definitions2.get('rootElements').push(process);

    definitions2.get('diagrams').push(diagram);

    const {
        xml: xmlStr2
    } = await moddle.toXML(definitions2);

    console.log(xmlStr2);

    fs.writeFileSync("./twoActivityWithConnector.xml", xmlStr2);


} // twoActivityWithConnector

async function xmlToJs(fileName) {

    let xml = fs.readFileSync(fileName, "utf-8");

    const {
        rootElement: definitions
    } = await moddle.fromXML(xml);

    console.log(definitions);

} // xmlToJs

//startProcess();

//xmlToJs("Doboz&Doboz.bpmn");

twoActivityWithConnector();
