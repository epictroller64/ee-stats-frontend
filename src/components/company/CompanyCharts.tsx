'use client'

import { CompanyFullDetails, Quarter } from '@/lib/types/responses'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '../layout/Card'

type QuarterWithLabel = Quarter & { label: string }

export default function CompanyCharts({ company }: { company: CompanyFullDetails }) {
    const sortedQuarters = sortQuarters(company)
    return <div className="grid grid-cols-2 gap-4">
        <RevenueChart quarters={sortedQuarters} />
        <StateTaxesChart quarters={sortedQuarters} />
        <EmployeesChart quarters={sortedQuarters} />
        <LaborTaxesChart quarters={sortedQuarters} />
    </div>
}

function RevenueChart({ quarters }: { quarters: QuarterWithLabel[] }) {
    console.log(quarters)
    return <Card>
        <h2 className="text-2xl font-semibold mb-4">Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={quarters}>
                <XAxis dataKey="quarter" />
                <YAxis dataKey="revenue" />
                <Tooltip formatter={(value) => `€ ${value}`} labelFormatter={(label, payload) => {
                    return payload[0]?.payload.label
                }} />
                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    </Card>
}

function StateTaxesChart({ quarters }: { quarters: QuarterWithLabel[] }) {
    return <Card>
        <h2 className="text-2xl font-semibold mb-4">State Taxes</h2>
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={quarters}>
                <XAxis dataKey="quarter" />
                <YAxis dataKey="stateTaxes" />
                <Tooltip formatter={(value) => `€ ${value}`} labelFormatter={(label, payload) => {
                    return payload[0]?.payload.label
                }} />
                <Area type="monotone" dataKey="stateTaxes" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    </Card>
}

function EmployeesChart({ quarters }: { quarters: QuarterWithLabel[] }) {
    return <Card>
        <h2 className="text-2xl font-semibold mb-4">Employees</h2>
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={quarters}>
                <XAxis dataKey="quarter" />
                <YAxis dataKey="employees" />
                <Tooltip formatter={(value) => `${value} employees`} labelFormatter={(label, payload) => {
                    return payload[0]?.payload.label
                }} />
                <Area type="monotone" dataKey="employees" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    </Card>
}

function LaborTaxesChart({ quarters }: { quarters: QuarterWithLabel[] }) {
    return <Card>
        <h2 className="text-2xl font-semibold mb-4">Labor Taxes</h2>
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={quarters}>
                <XAxis dataKey="quarter" />
                <YAxis dataKey="laborTaxes" />
                <Tooltip formatter={(value) => `€ ${value}`} labelFormatter={(label, payload) => {
                    return payload[0]?.payload.label
                }} />
                <Area type="monotone" dataKey="laborTaxes" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    </Card>
}


function sortQuarters(company: CompanyFullDetails) {
    const quarters = company.historyYears.flatMap(year => year.quarters.map(quarter => ({ ...quarter, label: `${year.year} Q${quarter.quarter}` })))
    const sorted = quarters.sort((a, b) => a.year - b.year || a.quarter - b.quarter)
    return sorted
}
