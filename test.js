import BpmnModdle from 'bpmn-moddle';

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

startProcess();
