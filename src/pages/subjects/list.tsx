import { CreateButton } from '@/components/refine-ui/buttons/create'
import { DataTable } from '@/components/refine-ui/data-table/data-table'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { ListView } from '@/components/refine-ui/views/list-view'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DEPARTMENT_OPTIONS } from '@/constants'
import { Subjects } from '@/types'
import { useTable } from '@refinedev/react-table'
import { ColumnDef } from '@tanstack/react-table'
import { Search } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'

const SubjectList = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const departmentFilters = selectedDepartment === 'all' ? [] : [{
    field: 'department',
    operator: 'eq' as const,
    value: selectedDepartment,
    permanent: true
  }];
  const searchFilters = searchQuery ? [{
      field: 'name',
      operator: 'contains' as const,
      value: searchQuery,
      permanent: true
  }] : [];

  const subjectTable = useTable<Subjects>({
    columns: useMemo<ColumnDef<Subjects>[]>(() => [
        {
            id: 'Code',
            accessorKey: 'Code',
            size: 100,
            header:() => <p className='column-title ml-2'>Code</p>,
            cell: ({ getValue })=> <Badge>{getValue<string>()}</Badge>
        },
        {
            id: 'name',
            accessorKey: 'name',
            size: 200,
            header:() => <p className='column-title ml-2'>Name</p>,
            cell: ({ getValue })=> <span className='text-foreground'>{getValue<string>()}</span>,
            filterFn: 'includesString'
        },{
            id: 'department',
            accessorKey: 'department',
            size: 150,
            header:() => <p className='column-title ml-2'>Department</p>,
            cell: ({ getValue })=> <Badge variant='secondary'>{getValue<string>()}</Badge>,
        },{
            id: 'description',
            accessorKey: 'description',
            size: 300,
            header:() => <p className='column-title ml-2'>Description</p>,
            cell: ({ getValue })=> <span className='truncate line-clamp-2'>{getValue<string>()}</span>,

        }
    ], []),
        refineCoreProps: {
            resource: 'subjects',
            pagination: {
                pageSize: 10
            },
            sorters: {
                initial:[
                    {field: 'createdAt',order: 'desc'}
                ]
            }
        }
  })

  useEffect(() => {
    subjectTable.refineCore.setFilters([...departmentFilters, ...searchFilters])
  }, [searchQuery, selectedDepartment])



  return (
    <ListView>
        <Breadcrumb/>
        <h1 className='page-title'>Subjects</h1>
        <div className='intro-row'>
            <p>Quick access to essential metrics and management tools.</p>
            <div className='action-row'>
                <div className='search-field'>
                    <Search className='search-icon'/>
                    <Input 
                        type='text'
                        placeholder='Search by name ...'
                        className='pl-10 w-full'
                        value={searchQuery}
                        onChange={(e)=>setSearchQuery(e.target.value)}
                    />
                </div>
                <div className='flex gap-2 w-full sm:w-auto mt-2 sm:mt-2'>
                    <Select
                        value={selectedDepartment}
                        onValueChange={setSelectedDepartment}
                    >
                        <SelectTrigger >
                            <SelectValue placeholder='Filter by department ...' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='all'>
                                All Departments
                            </SelectItem>
                            {DEPARTMENT_OPTIONS.map(dept => (
                                <SelectItem key={dept.value} value={dept.value}>
                                    {dept.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <CreateButton />
                </div>
            </div>
        </div>
        <DataTable table={subjectTable}/>
    </ListView>
  )
}

export default SubjectList 