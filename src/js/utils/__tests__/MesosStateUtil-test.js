const MesosStateUtil = require('../MesosStateUtil');

describe('MesosStateUtil', function () {

  describe('#flagMarathonTasks', function () {
    it('should assign a isStartedByMarathon flag to all tasks', function () {
      const state = {
        frameworks: [
          {
            name: 'marathon',
            tasks: [
              {name: 'spark', id: 'spark.1'},
              {name: 'alpha', id: 'alpha.1'}
            ],
            completed_tasks: [
              {name: 'alpha', id: 'alpha.2'}
            ]
          },
          {
            name: 'spark',
            tasks: [
              {name: '1'}
            ],
            completed_tasks: [
              {name: '2'}
            ]
          }
        ]
      };

      expect(MesosStateUtil.flagMarathonTasks(state)).toEqual({frameworks: [
        {
          name: 'marathon',
          tasks: [
            {name: 'spark', id: 'spark.1', isStartedByMarathon: true},
            {name: 'alpha', id: 'alpha.1', isStartedByMarathon: true}
          ],
          completed_tasks: [
            {name: 'alpha', id: 'alpha.2', isStartedByMarathon: true}
          ]
        },
        {
          name: 'spark',
          tasks: [
            {name: '1', isStartedByMarathon: false}
          ],
          completed_tasks: [
            {name: '2', isStartedByMarathon: false}
          ]
        }
      ]});
    });

  });

  describe('#getFramework', function () {
    const state = {
      frameworks: [
        {
          id: 'framework-123',
          name: 'test-1'
        }
      ],
      completed_frameworks: [
        {
          id: 'framework-abc',
          name: 'test-2'
        }
      ]
    };

    it('should return the matching framework', function () {
      expect(MesosStateUtil.getFramework(state, 'framework-123').name)
          .toEqual('test-1');
    });

    it('should return the matching "completed" framework', function () {
      expect(MesosStateUtil.getFramework(state, 'framework-abc').name)
          .toEqual('test-2');
    });

    it('should return nothing if no matching framework was found', function () {
      expect(MesosStateUtil.getFramework(state, 'unknown')).not.toBeDefined();
    });

  });

  describe('#getTasksFromVirtualNetworkName', function () {

    beforeEach(function () {
      this.instance = MesosStateUtil.getTasksFromVirtualNetworkName(
        {frameworks: [
          {id: 'foo'},
          {id: 'bar'},
          {id: 'baz', tasks: [{container: {network_infos:[{name: 'alpha'}]}}]},
          {id: 'qux', tasks: [
            {container: {network_infos:[{name: 'alpha'}]}},
            {container: {network_infos:[{name: 'beta'}]}}
          ]}
        ]},
        'alpha'
      );
    });

    it('should handle empty object well', function () {
      expect(MesosStateUtil.getTasksFromVirtualNetworkName({}, 'foo'))
        .toEqual([]);
    });

    it('should throw when a null state is provided', function () {
      expect(function () {
        MesosStateUtil.getTasksFromVirtualNetworkName(null, 'foo');
      }).toThrow();
    });

    it('should handle empty undefined well', function () {
      expect(MesosStateUtil.getTasksFromVirtualNetworkName(undefined, 'foo'))
        .toEqual([]);
    });

    it('should filter tasks that doesn\'t have the overlay name', function () {
      expect(this.instance.length).toEqual(2);
    });

    it('should find tasks from different frameworks', function () {
      expect(this.instance).toEqual([
        {container: {network_infos:[{name: 'alpha'}]}},
        {container: {network_infos:[{name: 'alpha'}]}}
      ]);
    });

  });

  describe('#getTaskPath', function () {

    describe('app/framework tasks', function () {
      const state = {
        frameworks: [
          {
            id: 'framework-123',
            name: 'test-1',
            executors: [
              {
                id: 'executor-foo',
                directory: 'foo'
              }
            ],
            completed_executors: [{
              id: 'executor-bar',
              directory: 'bar'
            }]
          }
        ]
      };

      it('gets the task path for a running task', function () {
        const task = {
          id: 'executor-foo',
          framework_id: 'framework-123',
          executor_id: 'executor-bar'
        };

        expect(MesosStateUtil.getTaskPath(state, task)).toEqual('foo/');
      });

      it('gets the task path form a completed task', function () {
        const task = {
          id: 'executor-bar',
          framework_id: 'framework-123',
          executor_id: 'executor-bar'
        };

        expect(MesosStateUtil.getTaskPath(state, task)).toEqual('bar/');
      });

      it('gets the task path for a task with unknown executor id', function () {
        const task = {
          id: 'executor-bar',
          framework_id: 'framework-123'
        };

        expect(MesosStateUtil.getTaskPath(state, task)).toEqual('bar/');
      });

      it('appends provided path', function () {
        const task = {
          id: 'executor-bar',
          framework_id: 'framework-123'
        };

        expect(MesosStateUtil.getTaskPath(state, task, 'test'))
            .toEqual('bar/test');
      });

    });

    describe('pod tasks', function () {
      const state = {
        frameworks: [
          {
            id: 'framework-123',
            name: 'test-1',
            executors: [
              {
                id: 'executor-foo',
                directory: 'foo',
                completed_tasks: [{id: 'task-foo-completed'}],
                tasks: [{id: 'task-foo-running'}]
              }
            ],
            completed_executors: [{
              id: 'executor-bar',
              directory: 'bar',
              completed_tasks: [{id: 'task-bar-completed'}]
            }]
          }
        ]
      };

      it('gets the task path for a running task', function () {
        const task = {
          id: 'task-foo-running',
          framework_id: 'framework-123'
        };

        expect(MesosStateUtil.getTaskPath(state, task))
            .toEqual('foo/tasks/task-foo-running/');
      });

      it('gets the task path form a completed task', function () {
        const task = {
          id: 'task-foo-completed',
          framework_id: 'framework-123'
        };

        expect(MesosStateUtil.getTaskPath(state, task))
            .toEqual('foo/tasks/task-foo-completed/');
      });

      it('gets the task path form a completed executor', function () {
        const task = {
          id: 'task-bar-completed',
          framework_id: 'framework-123'
        };

        expect(MesosStateUtil.getTaskPath(state, task))
            .toEqual('bar/tasks/task-bar-completed/');
      });

      it('appends provided path', function () {
        const task = {
          id: 'task-foo-running',
          framework_id: 'framework-123'
        };

        expect(MesosStateUtil.getTaskPath(state, task, 'test'))
            .toEqual('foo/tasks/task-foo-running/test');
      });

    });

  });

});
