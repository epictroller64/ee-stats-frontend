'use client'
import { useRef } from "react";


const nodeWidth = 100;
const nodeHeight = 100;
const nodeSpacing = 100;

function createNodes(companyName: string, ownerNames: string[], directorNames: string[], parentWidth: number, parentHeight: number) {

    const nodes: MapNodeProps[] = [];
    const ownerNodes: MapNodeProps[] = [];
    const directorNodes: MapNodeProps[] = [];
    const companyNode: MapNodeProps = {
        id: "company",
        type: "company",
        content: companyName,
        x: 0,
        y: 0,
        bottomChild: null,
        rightChild: null,
        leftChild: null,
    }
    nodes.push(companyNode);
    companyNode.x = (parentWidth + 200) / 2;
    companyNode.y = 50;

    ownerNames.forEach((ownerName, index) => {
        // Expand to the right 
        const ownerNode: MapNodeProps = {
            id: `owner-${index}`,
            type: "owner",
            content: ownerName,
            x: ownerNames.length > 1 ? companyNode.x - nodeWidth / 2 + index * (nodeWidth + nodeSpacing) : companyNode.x,
            y: companyNode.y + nodeHeight + nodeSpacing,
            bottomChild: null,
            rightChild: index > 0 ? `owner-${index - 1}` : null,
            leftChild: null,
        }
        ownerNodes.push(ownerNode);
        if (index > 0) {
            // get last owner node and add a right child
            const lastOwnerNode = ownerNodes[ownerNodes.length - 1];
            lastOwnerNode.rightChild = ownerNode.id;
        }
    });

    directorNames.forEach((directorName, index) => {
        // Expand to the right
        const directorNode: MapNodeProps = {
            id: `director-${index}`,
            type: "director",
            content: directorName,
            x: directorNames.length > 1 ? companyNode.x - nodeWidth / 2 + index * (nodeWidth + nodeSpacing) : companyNode.x,
            y: companyNode.y + 2 * (nodeHeight + nodeSpacing),
            bottomChild: null,
            rightChild: index > 0 ? `director-${index - 1}` : null,
            leftChild: null,
        }
        directorNodes.push(directorNode);
        if (index > 0) {
            // get last director node and add a right child
            const lastDirectorNode = directorNodes[directorNodes.length - 1];
            lastDirectorNode.rightChild = directorNode.id;
        }
    })

    // get only first nodes as they have children attached to them
    const nodesWithChildren = [...nodes, ...ownerNodes, ...directorNodes];
    return nodesWithChildren;
}


export default function RelationMap() {
    const nodes = createNodes("Company", ["Owner", "Owner2"], ["Director", "Director2"], 1000, 800);
    console.log(nodes)
    return (
        <div className="w-full bg-white rounded-lg shadow-md">
            <svg width="1000" height="800">
                {nodes.map((node) => {
                    if (node.type === "company") {
                        return <CompanyNode key={node.id} {...node} />
                    }
                    return <MapNode key={node.id} {...node} />
                })}
            </svg>
        </div>
    )
}

function CompanyNode({ content, id, x, y, bottomChild, rightChild, leftChild }: MapNodeProps) {
    // Top node
    return (
        <g id={id}>
            <rect x={x} y={y} width="100" height="100" fill="blue" />
            <text
                x={x + 50}
                y={y + 50}
                fontSize="16"
                fill="white"
            >
                {content}
            </text>
        </g>
    )
}

function MapNode({ content, id, x, y, bottomChild, rightChild, leftChild }: MapNodeProps) {
    const nodeRef = useRef<SVGRectElement>(null);
    return (
        <>
            <g>
                <rect ref={nodeRef} x={x} y={y} width="100" height="100" />
                <text
                    x={x + 50}
                    y={y + 50}
                    fontSize="12"
                    fill="green"
                    textAnchor="middle"
                    dominantBaseline="middle"
                >
                    {content}
                </text>
            </g>
        </>
    )
}

function Arrow({ startX, startY, endX, endY }: { startX: number, startY: number, endX: number, endY: number }) {
    return (
        <line x1={startX} y1={startY} x2={endX} y2={endY} stroke="green" strokeWidth="2" markerEnd="url(#arrowhead)" />
    )
}


type MapNodeProps = {
    id: string
    type: "company" | "director" | "owner"
    content: string;
    x: number;
    y: number;
    bottomChild: string | null;
    rightChild: string | null;
    leftChild: string | null;
}